import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Input from "./Component/Input/Input";
import Output from "./Component/Output/Output";

function App() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const dayValue = useRef();
  const monthValue = useRef();
  const yearValue = useRef();

  const dayError = useRef();
  const monthError = useRef();
  const yearError = useRef();

  const dayLabel = useRef();
  const monthLabel = useRef();
  const yearLabel = useRef();

  const [age, setAge] = useState({
    yearsTime: "0",
    monthTime: "0",
    dayTime: "0",
  });

  const removeError = () => {
    // Hiding error message
    const label = [dayLabel, monthLabel, yearLabel];
    const input = [dayValue, monthValue, yearValue];
    const error = [dayError, monthError, yearError];

    for (let i = 0; i < label.length; i++) {
      label[i].current.classList.remove("error");
      input[i].current.classList.remove("error");
      error[i].current.classList.add("hidden");
    }
  };

  const addErrorToLabelInputAndErrorText = (list, errorText) => {
    const [error, label, input] = list;
    error.current.classList.remove("hidden");
    error.current.textContent = errorText;
    label.current.classList.add("error");
    input.current.classList.add("error");
    input.current.focus();
    throw new Error(errorText);
  };

  const checkEmpty = (initial, value) => {
    let list = [dayError, dayLabel, dayValue];
    if (initial === "month") {
      list = [monthError, monthLabel, monthValue];
    } else if (initial === "year") {
      list = [yearError, yearLabel, yearValue];
    }

    if (value === "") {
      addErrorToLabelInputAndErrorText(list, "This field is required");
    }
  };

  const addError = (initial, value) => {
    let list = [dayError, dayLabel, dayValue];
    if (initial === "month") {
      list = [monthError, monthLabel, monthValue];
      if (value > 12) {
        addErrorToLabelInputAndErrorText(
          list,
          "Month cannot be greater than 12"
        );
      }
    } else if (initial === "year") {
      list = [yearError, yearLabel, yearValue];
      if (value > year) {
        addErrorToLabelInputAndErrorText(
          list,
          "Year cannot be greater than current year"
        );
      }
    } else {
      if (value > 31) {
        addErrorToLabelInputAndErrorText(list, "Day cannot be greater than 31");
      }
    }
  };

  const showError = (inputYear, inputDay, inputMonth) => {
    const list = {
      day: inputDay,
      month: inputMonth,
      year: inputYear,
    };

    if (inputYear == year) {
      if (inputDay > day) {
        addErrorToLabelInputAndErrorText(
          [dayError, dayLabel, dayValue],
          "Day cannot be greater than current day"
        );
      }

      if (inputMonth > month) {
        addErrorToLabelInputAndErrorText(
          [monthError, monthLabel, monthValue],
          "Month cannot be greater than current month"
        );
      }
    }

    for (const [key, value] of Object.entries(list)) {
      checkEmpty(key, value);
      addError(key, value);
    }
  };

  const calculateAge = () => {
    const inputYear = yearValue.current.value;
    const inputMonth = monthValue.current.value;
    const inputDay = dayValue.current.value;

    removeError();
    try {
      showError(inputYear, inputDay, inputMonth - 1);
    } catch {
      return;
    }

    let ageYear = year - inputYear;
    let ageMonth = month - (inputMonth - 1);
    let ageDay = day - inputDay;

    if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
      ageYear = ageYear - 1;
      ageMonth += 12;
      if (ageDay < 0) {
        const daysInLastMonth = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          0
        ).getDate();
        ageDay += daysInLastMonth;
        ageMonth--;
      }
    }

    setAge({
      yearsTime: ageYear,
      monthTime: ageMonth,
      dayTime: ageDay,
    });
  };

  return (
    <div className="App">
      <div className="top">
        <Input
          label="Day"
          placeholder={day}
          ref={[dayValue, dayError, dayLabel]}
        />
        <Input
          label="Month"
          placeholder={month}
          ref={[monthValue, monthError, monthLabel]}
        />
        <Input
          label="Year"
          placeholder={year}
          ref={[yearValue, yearError, yearLabel]}
        />
      </div>
      <div className="divider">
        <hr />
        <img onClick={calculateAge} src="/icon-arrow.svg" alt="" />
      </div>
      <div className="bottom">
        <Output time={age.yearsTime} text="Years" />
        <Output time={age.monthTime} text="Months" />
        <Output time={age.dayTime} text="Days" />
      </div>
    </div>
  );
}

export default App;
