const submit = document.getElementById("submit");
      const deleteBtn = document.getElementById("deleteBtn");

      submit.addEventListener("click", addItems);

      function isValidDate(dateString) {
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
          return false;
        }
        const [day, month, year] = dateString.split("/").map(Number);
        const date = new Date(year, month - 1, day);

        if (
          date.getFullYear() !== year ||
          date.getMonth() + 1 !== month ||
          date.getDate() !== day
        ) {
          return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      }

      function addItems(e) {
        e.preventDefault();
        let title_c = document.getElementById("Title").value;
        let desc_c = document.getElementById("desc").value;
        let dueDate_c = document.getElementById("dueDate").value;

        if (!isValidDate(dueDate_c)) {
          alert("Please enter a valid date in the format dd/mm/yyyy and ensure it is not less than the current date.");
          document.getElementById("dueDate").value = "";
          return;
        }

        let table = document.getElementById("todo");
        let row = document.createElement("tr");

        const createCell = (text) => {
          let cell = document.createElement("td");
          cell.appendChild(document.createTextNode(text));
          return cell;
        };

        let btnCell = document.createElement("td");

        let deleteBtn = document.createElement("button");
        deleteBtn.appendChild(document.createTextNode("Delete"));
        deleteBtn.classList.add("btn_Delete");

        let editBtn = document.createElement("button");
        editBtn.appendChild(document.createTextNode("Edit"));
        editBtn.classList.add("btn_Edit");

        deleteBtn.addEventListener("click", () => {
          table.removeChild(row);
        });

        editBtn.addEventListener("click", () => {
          document.getElementById("Title").value = title_c;
          document.getElementById("desc").value = desc_c;
          document.getElementById("dueDate").value = dueDate_c;
          table.removeChild(row);
        });

        if (
          title_c.trim() == "" || title_c.trim() == null ||
          desc_c.trim() == "" || desc_c.trim() == null ||
          dueDate_c.trim() == "" || dueDate_c.trim() == null
        ) {
          document.getElementById("Title").value = "";
          document.getElementById("desc").value = "";
          document.getElementById("dueDate").value = "";
          return false;
        } else {
          row.appendChild(createCell(title_c));
          row.appendChild(createCell(desc_c));
          row.appendChild(createCell(dueDate_c));

          btnCell.appendChild(editBtn);
          btnCell.appendChild(deleteBtn);
          row.appendChild(btnCell);

          // row.style.backgroundColor = getrendombgcolor();
          // row.style.color = getrendomcolor();
        }

        let RowIndex = document.getElementsByTagName("tr").length - 1;

        switch (RowIndex % 5) {
          case 1:
            row.style.backgroundColor = `rgb(189, 150, 242)`;
            row.style.color = `white`;
            break;
          case 2:
            row.style.backgroundColor = `rgb(227, 109, 178)`;
            row.style.color = `white`;
            break;
          case 3:
            row.style.backgroundColor = `rgb(63, 193, 232)`;
            row.style.color = `white`;
            break;
          case 4:
            row.style.backgroundColor = `rgb(209, 153, 88)`;
            row.style.color = `white`;
            break;
          case 0:
          default:
            row.style.backgroundColor =  `rgb(106, 235, 138)`;
            row.style.color = `white`;
            break;
        }

        table.appendChild(row);

        document.getElementById("Title").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("dueDate").value = "";
      }

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("todoTitle");
        localStorage.removeItem("todoDesc");
        localStorage.removeItem("todoDueDate");

        document.getElementById("Title").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("dueDate").value = "";
      });