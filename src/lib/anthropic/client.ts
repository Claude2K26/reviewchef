import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

interface GenerateReviewResponseParams {
  restaurantName: string;
  cuisineType: string;
  tone: string;
  signature: string;
  reviewText: string;
  rating: number;
  authorName: string;
}

function getToneDescription(tone: string): string {
  const tones: Record<string, string> = {
    professional: "professional and courteous",
    friendly: "friendly and warm",
    casual: "casual and approachable",
    formal: "formal and polished",
    warm: "warm and inviting like a family restaurant",
  };
  return tones[tone] || "professional and courteous";
}

function getRatingGuidance(rating: number): string {
  if (rating === 5) {
    return `This is a 5-star review. Express sincere enthusiasm and gratitude.
    Mirror their positive energy. Mention specific elements they praised.
    Invite them to come back soon.`;
  }
  if (rating >= 3) {
    return `This is a ${rating}-star review. Acknowledge the positives warmly and address
    any constructive feedback with grace. Show commitment to excellence.
    Express hope to see them again.`;
  }
  return `This is a ${rating}-star review. This customer was disappointed.
  Respond with empathy and professionalism — do NOT be defensive.
  Acknowledge their experience genuinely, apologize for not meeting expectations,
  and offer to make it right (e.g., invite them to contact you directly or return).
  Show that you take feedback seriously.`;
}

export async function generateReviewResponse(
  params: GenerateReviewResponseParams,
  retries = 3
): Promise<string> {
  const { restaurantName, cuisineType, tone, signature, reviewText, rating, authorName } = params;

  const languageInstruction = reviewText.trim().length < 5
    ? "Réponds en français."
    : "Réponds dans la même langue que l'avis du client. Si l'avis est en anglais, réponds en anglais. Si l'avis est en espagnol, réponds en espagnol. Si l'avis est en français, réponds en français. Adapte-toi à la langue détectée.";

  const systemPrompt = `${languageInstruction}

You are the owner of "${restaurantName}", a ${cuisineType} restaurant.
Your communication style is ${getToneDescription(tone)}.
You respond to Google reviews personally and authentically.

Rules:
- Keep responses between 60 and 150 words
- Address the reviewer by their first name if possible
- Never use generic copy-paste responses
- Do not use the phrase "Cher(e) client(e)"
- Sound human, not robotic
- End with the signature: "${signature || restaurantName}"
- Never make up facts not mentioned in the review`;

  const userPrompt = `${getRatingGuidance(rating)}

Reviewer name: ${authorName}
Star rating: ${rating}/5
Review text: "${reviewText}"

Write a personalized response to this review.`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
      });

      const content = message.content[0];
      if (content.type === "text") {
        return content.text.trim();
      }
      throw new Error("Unexpected response type from Claude");
    } catch (error) {
      if (attempt === retries - 1) throw error;
      // Wait before retry (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }

  throw new Error("Failed to generate response after retries");
}
