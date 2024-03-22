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
          content: `You are tasked with analyzing a collection of employee reviews for a specific company. Your analysis should delve into various aspects of the company's functionality, including its work environment, management practices, employee satisfaction, and overall operational efficiency. Based on the insights drawn from these reviews, compose a comprehensive 500-word report. This report should not only summarize the key points from the reviews but also provide an evaluative commentary on the company's strengths, areas for improvement, and the overall workplace culture. Ensure that your analysis is balanced, drawing on specific examples from the reviews to support your observations and conclusions.
        <reviews>
        ${data.data}
        </reviews>`,
        },
      ],
      model: "gpt-3.5-turbo",
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
