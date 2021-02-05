export const getReadings = () => {
    const data = fetch("http://localhost:8000/mass-readings/012721");
    data.then(response => {
        console.log("Response:", response)
        return response.json();
    }).then(readings => {
        console.log("Readings:", readings)
    })
}

export const fetchReadings = async (date) => {
    try {
        const response = await fetch(`http://192.168.8.101:8000/mass-readings/${date}`)

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
        const response = await fetch("http://192.168.8.101:8000/reflections/list")

        if (response.status == 200) {
            const result = await response.json();
            console.log("Count:", result.length)
            return result;
        }
    } catch (err) {
        console.log("Error:", err)
    }

}

export const fetchYoutubeId = async (link) => {

    try {
        const response = await fetch(`http://192.168.8.101:8000/vid${link}`)

        if (response.status == 200) {
            const result = await response.json();
            console.log(result)
            return result.youtubeId;
        }
    } catch (err) {
        console.log("Error:", err)
    }
    // return "Jj_ETWc_UtE"

}

export const fetchReflectionTextList = async () => {
    try {
        const response = await fetch("http://192.168.8.101:8000/reflections/text/list")

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
        const response = await fetch(`http://192.168.8.101:8000/reflections/text/single/${date}`, {
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
        console.log("Error:", err)
    }

}