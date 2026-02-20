const express = require("express");
const app = express();
app.use(express.static("public"));

app.use(express.json());

const timezoneMap = {
  KST: "Asia/Seoul",
  EST: "America/New_York",
  PST: "America/Los_Angeles",
  JST: "Asia/Tokyo",
  CST: "America/Chicago",
  GMT: "Europe/London",
  CET: "Europe/Paris",
};

app.post("/timezone", async (req, res) => {
  const input = req.body.timezone?.toUpperCase();
  const tz = timezoneMap[input];

  if (!tz) {
    return res.json({ error: "Unknown timezone. Try: KST, EST, PST, JST, CST, GMT, CET" });
  }

  try {
    const response = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${tz}`);
    const data = await response.json();
    res.json({
      timezone: input,
      datetime: data.dateTime,
      date: data.date,
      time: data.time,
    });
  } catch (error) {
    res.json({ error: "Failed to fetch time" });
  }
});

// app.get("/timezones", (_req, res) => {
//   res.json(Object.keys(timezoneMap));
// });

app.listen(8001, () => {
  console.log("working server");
});
