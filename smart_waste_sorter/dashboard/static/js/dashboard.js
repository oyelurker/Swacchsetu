setInterval(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      document.getElementById("fill").textContent = data.fill_level + "%";
      document.getElementById("battery").textContent = data.battery + "%";
      document.getElementById("items").textContent = data.items_sorted;
      document.getElementById("last").textContent = data.last_item;
      document.getElementById("temp").textContent = data.system_temp + "°C";
      document.getElementById("status").textContent = data.status;
    });
}, 2000);