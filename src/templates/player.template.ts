import type { MergedRecord } from "../types/merged.record.js";

export const generateHtml = (playerName: string, playerRecords: MergedRecord[]): string => {
    const rows = generateRows(playerRecords);

    const html = `<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Kreedz Records</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

</head>

<body>

  <div class="container mt-4">
    <h3 class="mb-3">Player: ${playerName}</h3>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Map</th>
          <th>Position</th>
          <th>Average</th>
          <th>Time</th>
          <th>Date</th>
          <th>Type</th>
          <th>Length</th>
          <th>Difficulty</th>
        </tr>
      </thead>

      <tbody>${rows}
      </tbody>
    </table>

  </div>

</body>

</html>`;

    return html;
}

export const generateRows = (playerRecords: MergedRecord[]): string => {
    const rows = playerRecords.map((row, index) => {
        return `
        <tr>
          <td>${index + 1}</td>
          <td>${row.map}</td>
          <td>${row.position}</td>
          <td>${row.average}</td>
          <td>${row.time}</td>
          <td>${row.date}</td>
          <td>${row.type}</td>
          <td>${row.length}</td>
          <td>${row.difficulty}</td>
        </tr>` }).join("");

    return rows;
}
