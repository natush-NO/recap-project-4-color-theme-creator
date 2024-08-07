import { useEffect, useState } from "react";

export const checkContrastRatio = async (hex, contrastText) => {
  try {
    const response = await fetch(
      "https://www.aremycolorsaccessible.com/api/are-they",
      {
        method: "POST",
        body: JSON.stringify({
          foreground: contrastText,
          background: hex,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await response.json();
    console.log("Contrast check result:", result);

    if (result && result.pass) {
      return "Contrast ratio is sufficient.";
    } else {
      return "Contrast ratio is insufficient.";
    }
  } catch (error) {
    console.error("Error checking contrast:", error);
    return "Error checking contrast.";
  }
};

export function ContrastColorCheck({ checkHex, checkContrast }) {
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function postFetch() {
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            method: "POST",
            body: JSON.stringify({ colors: [checkHex, checkContrast] }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const fetchedScore = await response.json();

        if (fetchedScore && fetchedScore.overall) {
          setScore(fetchedScore.overall);
        } else {
          setScore("Currently unavailable, please try again later.");
        }
      } catch (error) {
        console.error("Error getting contrast score:", error);
      }
    }

    postFetch();
  }, [checkHex, checkContrast]);

 
  const backgroundColor = () => {
    switch (score) {
      case "Nope":
        return "white";
      case "Yup":
        return "#135D66"; 
      case "Kinda":
        return "orange";
      default:
        return "transparent"; 
    }
  };

const color = () => {
  switch (score) {
    case "Nope":
    case "Yup":
    case "Kinda":
      return "black"; 
    default:
      return "red"; 
  }
};


  return (
    <p
      style={{
        fontSize: "26px",
        backgroundColor: backgroundColor(), 
        color: color(),
        textTransform: "uppercase",
        display: "inline-block", 
        padding: "0 10px"
      }}
    >
      Overall contrast score: {score !== null ? score : "Loading..."}
    </p>
  );
}
