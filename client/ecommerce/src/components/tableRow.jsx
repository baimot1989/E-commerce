const TableRow = ({ item, columns }) => {
    console.log(item)
    console.log(columns)

    return (
        <>
                <tr>
                    {columns.map((col, index) => (

                        <td key={index}>{item[col.value]}</td>
                    ))}
                </tr>
        </>
    );
}
export default TableRow;

// const TableRow1 = ({ item, columns }) => {
//     return (
//         <tr>
//             {columns.map((col, index) => {
//                 const value = item[col.value];

//                 if (typeof value === 'object' && value !== null) {
//                     // Special case: render nested table or summary
//                     if (col.value === 'productsBought') {
//                         return (
//                             <td key={index}>
//                                 <table>
//                                     <thead>
//                                         <tr>
//                                             {value.productsColumns.map((pCol, i) => (
//                                                 <th key={i}>{pCol.header}</th>
//                                             ))}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {value.userPurchases.map((purchase, j) => (
//                                             <tr key={j}>
//                                                 <td>{purchase.title}</td>
//                                                 <td>{purchase.quantity}</td>
//                                                 <td>{purchase.date}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </td>
//                         );
//                     } else {
//                         // Fallback for unknown object values
//                         return <td key={index}>[Object]</td>;
//                     }
//                 }

//                 return <td key={index}>{value}</td>;
//             })}
//         </tr>
//     );
// };

// export default TableRow1;