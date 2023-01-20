// button.addEventListener("click", getQuote());
function typeWriter(text, element, speed) {
  let i = 0;
  element.innerHTML = "";
  let typing = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, speed);
}

function getQuote() {
  //storing api key in variable to make dynamic
  const apiKey = "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";
  // grabbing users value from input elements id
  const userPrompt = document.querySelector("#user-prompt").value;
  // variables below are specifying what game I want quotes from
  const promptSpecification = `quotes from ${userPrompt}`;
  // chat gpt fetch request
  fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    // The JSON.stringify() function is used to convert the JavaScript object to a JSON-formatted string, so that it can be sent as the request body.
    body: JSON.stringify({
      prompt: promptSpecification,
      max_tokens: 200,
      // specifying accuracy of ai's results
      temperature: 0.5,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const quote = data.choices[0].text;
      typeWriter(quote, document.querySelector("#quote"), 40);
    })
    .catch((error) => {
      alert(error);
    });
}
