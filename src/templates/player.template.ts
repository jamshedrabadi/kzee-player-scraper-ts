import { escapeHtml } from "../utils/html.utils.js";
import type { MergedRecord } from "../types/merged.record.js";
import { DIFFICULTY_ORDER, LENGTH_ORDER } from "../config/constants.js";

export const generateHtml = (playerName: string, playerRecords: MergedRecord[]): string => {
    const rows = generateRows(playerRecords);
    const styles = generateStyles();
    const script = generateScript();

    const html = `<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Kreedz Records</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  ${styles}
</head>

<body>

  <div class="container mt-4">
    <h3 class="mb-3">Player: ${escapeHtml(playerName)}</h3>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th class="sortable"># <span class="arrow"></span></th>
          <th onclick="sortTable(1)" class="sortable">Map <span class="arrow"></span></th>
          <th onclick="sortTable(2)" class="sortable">Position <span class="arrow"></span></th>
          <th onclick="sortTable(3)" class="sortable">Average <span class="arrow"></span></th>
          <th onclick="sortTable(4)" class="sortable">Time <span class="arrow"></span></th>
          <th onclick="sortTable(5)" class="sortable">Date <span class="arrow"></span></th>
          <th onclick="sortTable(6)" class="sortable">Type <span class="arrow"></span></th>
          <th onclick="sortTable(7)" class="sortable">Length <span class="arrow"></span></th>
          <th onclick="sortTable(8)" class="sortable active">Difficulty <span class="arrow">▼</span></th>
        </tr>
      </thead>

      <tbody>${rows}
      </tbody>
    </table>

  </div>
  ${script}

</body>

</html>`;

    return html;
}

export const generateRows = (playerRecords: MergedRecord[]): string => {
    const rows = playerRecords.map((row, index) => {
        return `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(row.map)}</td>
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

export const generateStyles = (): string => {
    const styles = `
  <style>
    .sortable {
      cursor: pointer;
      transition: 0.2s ease;
    }

    .arrow {
      margin-left: 6px;
      font-size: 0.8rem;
    }

    tbody {
      transition: opacity 0.15s ease;
    }
  </style>`;

    return styles;
}

export const generateScript = (): string => {
    const script = `
  <script>

    const lengthOrder = ${JSON.stringify(LENGTH_ORDER)};
    const difficultyOrder = ${JSON.stringify(DIFFICULTY_ORDER)};
    let currentSortColumn = 8; // # column active
    let currentDirection = "desc";

    function sortTable(columnIndex) {

      const table = document.querySelector("table");
      const tbody = table.querySelector("tbody");
      const headers = document.querySelectorAll("th");
      const rows = Array.from(tbody.querySelectorAll("tr"));

      // Fade out
      tbody.style.opacity = "0";

      setTimeout(() => {

        // If clicking same column then toggle
        if (columnIndex === currentSortColumn) {
          currentDirection = currentDirection === "asc" ? "desc" : "asc";
        } else {
          currentSortColumn = columnIndex;
          currentDirection = "asc";
        }

        rows.sort((a, b) => {

          if ([7, 8].includes(columnIndex)) { // length, difficulty
            const newOrder = columnIndex === 7 ? lengthOrder : difficultyOrder;

            const aDiff = a.children[columnIndex].innerText.trim().toLowerCase();
            const bDiff = b.children[columnIndex].innerText.trim().toLowerCase();
            const aIndex = newOrder.indexOf(aDiff);
            const bIndex = newOrder.indexOf(bDiff);

            return currentDirection === "asc"
              ? bIndex - aIndex
              : aIndex - bIndex;
          }

          let aValue = a.children[columnIndex].innerText.trim();
          let bValue = b.children[columnIndex].innerText.trim();

          const aNum = Number(aValue);
          const bNum = Number(bValue);
          const isNumeric = !isNaN(aNum) && !isNaN(bNum);

          if (isNumeric) {
            return currentDirection === "asc"
              ? aNum - bNum
              : bNum - aNum;
          }

          return currentDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        });

        rows.forEach(row => tbody.appendChild(row));

        // Update numbering column
        rows.forEach((row, index) => {
          row.children[0].innerText = index + 1;
        });

        // Remove all arrows & active states
        headers.forEach(header => {
          header.classList.remove("active");
          header.querySelector(".arrow").innerText = "";
        });

        // Keep arrow on active column
        headers[currentSortColumn].classList.add("active");
        headers[currentSortColumn].querySelector(".arrow").innerText =
          currentDirection === "asc" ? "▲" : "▼";

        // Fade back in
        tbody.style.opacity = "1";

      }, 150);
    }

  </script>`;

    return script;
}
