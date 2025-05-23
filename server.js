const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/notify", async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  try {
    await axios.post(
      "https://ntfy.sh/onboarding_forms",
      `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}`,
      {
        headers: {
          Title: "NEW ONBOARDING FORM SUBMISSION",
          Priority: "urgent",
        },
      }
    );

    console.log("Notification sent successfully");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Notification error:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to send notification" });
  }
});

app.post("/api/portfolio-notification", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    await axios.post(
      "https://ntfy.sh/portfolio-forms",
      `Name: ${firstName} ${lastName}\nEmail: ${email}`,
      {
        headers: {
          Title: "NEW PORTFOLIO FORM SUBMISSION",
          Priority: "urgent",
        },
      }
    );

    console.log("Notification sent successfully");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Notification error:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to send notification" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
