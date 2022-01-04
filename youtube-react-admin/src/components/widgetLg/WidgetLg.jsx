import "./widgetLg.css";

export default function WidgetLg(props) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Leave transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Name</th>
          <th className="widgetLgTh">Start Date</th>
          <th className="widgetLgTh">End Date</th>
          <th className="widgetLgTh">Leave Type</th>
        </tr>
        {props.data.leaves.map((link) => (
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">{link.name}</span>
            </td>
            <td className="widgetLgDate">{link.startDate}</td>
            <td className="widgetLgAmount">{link.endDate}</td>
            <td className="widgetLgStatus">{link.leaveType}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
{
  /* <Button type="Declined" /> */
}
