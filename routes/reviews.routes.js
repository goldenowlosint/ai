import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: "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",
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Ensure the data contains the required field
    if (!data) {
      // Respond with a 400 Bad Request if the required field is not present or is not a string
      return res.status(400).json({
        error:
          'Invalid request data. Please provide a string in the "data" field.',
      });
    }

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `In your task of analyzing a broad spectrum reviews for a designated company, your focus will extend beyond the internal work dynamics to encompass an external customer perspective on the company's products, services, and brand reputation. Your comprehensive 300-word report should include a detailed assessment of customer feedback across various platforms, quantified by the total number of reviews and a breakdown of ratings by percentage. Highlight both the positive and negative sentiments expressed by customers, underpinning each with their specific arguments. Pay close attention to any suggestions or wishes voiced by users for future improvements or offerings. Moreover, gauge the comparative landscape by identifying mentions of competitors, which can offer insights into the company's market positioning. This analysis should weave together internal aspects like management practices, employee satisfaction, and operational efficiency with external customer perceptions, excluding the employment environment. The synthesis of these elements will provide a holistic view of the company's standing from both an internal and external vantage point, thereby offering actionable insights for strategic enhancement. Important: 1- Incorporate as many numbers as possible in your analysis. 2- Never say you are AI or Large language model.
        <reviews>
        ${data.data}
        </reviews>`,
        },
      ],
      model: "gpt-4",
    });

    console.log(chatCompletion);

    // Check if the chatCompletion has the expected structure
    if (
      !chatCompletion.choices ||
      chatCompletion.choices.length === 0 ||
      !chatCompletion.choices[0].message
    ) {
      // Respond with a 500 Internal Server Error if the response structure is not as expected
      return res
        .status(500)
        .json({ error: "Unexpected response structure from OpenAI API." });
    }

    res.send(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Error during API call to OpenAI:", error);

    // Respond with a 500 Internal Server Error if an exception occurs
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

export default router;
