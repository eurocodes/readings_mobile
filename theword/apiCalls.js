//const baseUrl = "http://localhost:8000";
const baseUrl = "https://massreadingsapi.azurewebsites.net";

export const getReadings = () => {
    const data = fetch(`${baseUrlLocal}/mass-readings/012721`);
    data.then(response => {
        console.log("Response:", response)
        return response.json();
    }).then(readings => {
        console.log("Readings:", readings)
    })
}

export const fetchReadings = async (date) => {
    try {
        const response = await fetch(`${baseUrl}/mass-readings/${date}`)

        if (response.status == 200) {
            const result = await response.json();
            if (result.text[0].text && !result.text[0].title) {
                result.text[0].title = "Reading I"
            }
            return result;
        }
    } catch (err) {
        console.log("Error:", err)
    }

}

export const fetchReadingsSpecial = async (link) => {
    let id = link.split("/");
    id = id[id.length - 1];
    try {
        const response = await fetch(`${baseUrl}/readings/special/${id}`)

        if (response.status == 200) {
            const result = await response.json();
            return result;
        }
    } catch (err) {
        console.log("Error:", err)
    }

}

export const fetchReflections = async () => {
    try {
        const response = await fetch(`${baseUrl}/reflections/list`)

        if (response.status == 200) {
            const result = await response.json();

            for (let i = 0; i <= result.length - 1; i++) {
                let dateStr = result[i].title;
                dateStr = dateStr.split(" ");
                let year = dateStr[0],
                    month = parseInt(dateStr[1]) - 1,
                    day = dateStr[2],
                    date = new Date(new Date(year, month, day).getTime());
                result[i].date = date.toDateString();
            }
            return result;
        }
    } catch (err) {
        console.log("Error:", err)
    }

}

export const fetchYoutubeId = async (link) => {

    try {
        const response = await fetch(`${baseUrl}/vid${link}`)

        if (response.status == 200) {
            const result = await response.json();
            return result.youtubeId;
        }
    } catch (err) {
        console.log("Error:", err)
    }
    // return "Jj_ETWc_UtE"

}

export const fetchReflectionTextList = async () => {
    try {
        const response = await fetch(`${baseUrl}/reflections/text/list`)

        if (response.status == 200) {
            const result = await response.json();
            return result;
        }
    } catch (err) {
        console.log("Error:", err)
    }

}

export const fetchReflectionTextSingle = async (url, date) => {
    try {
        const response = await fetch(`${baseUrl}/reflections/text/single/${date}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ url })
        })

        if (response.status == 200) {
            const result = await response.json();
            // console.log("Resp Always:", result)
            return result;
        }
    } catch (err) {
        console.log("Error fetchReflectionTextSingle():", err)
    }

}

// Get site details
export const fetchDetailsFromSite = async () => {
    try {
        const response = await fetch(`${baseUrl}/about`)

        if (response.status == 200) {
            const result = await response.json();
            return result;
        }
    } catch (err) {
        console.log("Error:", err)
    }

}