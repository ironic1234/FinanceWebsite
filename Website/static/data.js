let response = fetch('https://localhost:3000/data', {mode: "no-cors"})
if (!response.ok) {
    console.log('response was bad')
}