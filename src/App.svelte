<script>
    async function handleChange(e) {
      const files = e.target.files;
      console.log("files", files);
      if (files.length > 0) {
        var data = new FormData()
data.append('file', files[0])
        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: data,
        });
        console.log('response', response)
        const json = await response.json();
        console.log(json);
      }
    }
  </script>
  <input type="file" accept="application/pdf" on:change={handleChange} />
