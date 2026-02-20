window.onload = function () {
  document.getElementById("timezoneForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const timezone = document.getElementById("timezoneInput").value;
    const output = document.getElementById("output");

    const response = await fetch("/timezone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timezone: timezone }),
    });

    const data = await response.json();

    if (data.error) {
      output.textContent = data.error;
    } else {
      output.textContent = new Date(data.datetime).toLocaleString();
    }
  });
};
