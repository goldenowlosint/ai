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
          content: `You are tasked with analyzing web traffic data for a company. Based on the provided traffic statistics, conduct a thorough analysis and generate a comprehensive report. Your report should cover the following aspects: 1-Traffic Volume. 2-Traffic Sources. 3-User Engagement. 4- Conversion Rates. 5-Geographic Distribution. 7-Recommendations. Your report should synthesize these insights to offer a clear understanding of the company's current web traffic status and its implications for the company's overall functionality and strategy. Use the data effectively to support your analysis and recommendations. Important: 1- Incorporate as many numbers as possible in your analysis. 2- Never say you are AI or Large language model.
          <traffic>
            ${data.data}
          </traffic>`,
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
