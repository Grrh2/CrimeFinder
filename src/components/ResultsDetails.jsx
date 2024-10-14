export default function ResultsDetails({theDetails}) {
    const {theCenter, results} = theDetails;
    return (
        <>
            <table><thead><tr>
                <th>Category</th>
                <th>Street (On or near)</th>
                <th>Outcome</th>
                </tr></thead><tbody>
                {
                    results.map((item) =>(
                    <tr key={item.id}>
                        <td>{item.category}</td>
                        <td>{item.location.street.name.replace("On or near","")}</td>
                        {item.outcome_status !== null && (<td>{item.outcome_status.category}</td>)}

                    </tr>
                ))
                }
            </tbody></table>
        </>
    );
}