import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = ({ value, handleChange }) => {
  return (
    <DateRange
      ranges={[value]}
      rangeColors={["#f43f5e"]}
      date={value.startDate}
      onChange={handleChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={value.startDate}
      maxDate={value.endDate}
    />
  );
};

export default DatePicker;
