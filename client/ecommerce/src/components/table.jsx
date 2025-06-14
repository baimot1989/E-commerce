import TableHeadItems from "./tableHeadItems";
import TableRow from "./tableRow";

const Table = ({ columns, data }) => {
  // console.log(data)

    return (
        <div >
          <table >
            <thead>
              <tr>
                {columns.map((col) => ( // Generates headers for each column in the first row of the table
                  <th
                    key={col.accessor}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => ( // Generates rows in a table dynamically based on information it receives from a parent component(data)
                <tr key={row.id || idx}>
                  {columns.map((col) => ( // Fills the columns in each row dynamically according to the information it receives from a parent component(columns)
                    <td key={col.accessor}>
                        {/* // Logic that dynamically creates an additional table within the last field provided that there is relevant information for it. Additional table */}
                      {col.isNested && Array.isArray(row[col.accessor]) && row[col.accessor].length  > 0 ? ( // Condition that checks isNested is true and row[col.accessor] is Array and is not empty
                        <Table columns={col.nestedColumns} data={row[col.accessor]} />
                      ) : (
                        row[col.accessor] || "-" // if false file the td tag withe "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

}

export default Table;