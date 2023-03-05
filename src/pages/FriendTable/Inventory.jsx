import { useEffect, useState } from "react";
import { Box } from "@mui/system";
// import PersistentDrawerLeft from '../Account/sidebar'
import addNotification from "react-push-notification";
import { EnhancedTable } from "./Table";
import {
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Autocomplete,
  TextField,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { TablePending } from "./TableOther";
import axios from "axios";
import { useParams } from "react-router-dom";

const data = {
  partners: [
    {
      name: "Emily",
      age: 25,
      gender: "Female",
      interests: ["Hiking", "Photography"],
      preferred_destination: "National Parks",
      travel_style: "Budget",
      location: "United States",
      status: "Accepted",
    },
    {
      name: "Jack",
      age: 32,
      gender: "Male",
      interests: ["Food", "Music"],
      preferred_destination: "Europe",
      travel_style: "Luxury",
      location: "United Kingdom",
      status: "Rejected",
    },
    {
      name: "Sarah",
      age: 28,
      gender: "Female",
      interests: ["Beach", "Yoga"],
      preferred_destination: "Southeast Asia",
      travel_style: "Solo",
      location: "Thailand",
      status: "Pending",
    },
    {
      name: "Alex",
      age: 30,
      gender: "Male",
      interests: ["History", "Museums"],
      preferred_destination: "South America",
      travel_style: "Backpacking",
      location: "Peru",
      status: "Accepted",
    },
    {
      name: "Rachel",
      age: 26,
      gender: "Female",
      interests: ["Skiing", "Snowboarding"],
      preferred_destination: "Canada",
      travel_style: "Adventure",
      location: "Canada",
      status: "Rejected",
    },
    {
      name: "Tom",
      age: 29,
      gender: "Male",
      interests: ["Wildlife", "Camping"],
      preferred_destination: "Africa",
      travel_style: "Cultural",
      location: "South Africa",
      status: "Pending",
    },
    {
      name: "Lily",
      age: 27,
      gender: "Female",
      interests: ["Scuba Diving", "Snorkeling"],
      preferred_destination: "Australia",
      travel_style: "Sustainable",
      location: "Australia",
      status: "Accepted",
    },
    {
      name: "Mike",
      age: 33,
      gender: "Male",
      interests: ["Road Trips", "Surfing"],
      preferred_destination: "California",
      travel_style: "Active",
      location: "United States",
      status: "Pending",
    },
    {
      name: "Ava",
      age: 24,
      gender: "Female",
      interests: ["Art", "Architecture"],
      preferred_destination: "Japan",
      travel_style: "Relaxing",
      location: "Japan",
      status: "Accepted",
    },
    {
      name: "Sam",
      age: 31,
      gender: "Male",
      interests: ["Wine Tasting", "City Exploration"],
      preferred_destination: "Italy",
      travel_style: "Romantic",
      location: "Italy",
      status: "Rejected",
    },
  ],
};

const TabLabel = ({ name, number, checked }) => {
  return (
    <Box
      classname="respInv"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        background: `${
          checked === name ? "white" : "rgba(223, 248, 223, 0.669)"
        }`,
        borderRadius: "10px 10px 0 0",
        padding: "10px 20px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: `${checked === name ? "black" : "#7c7f81"}`,
        }}
      >
        {name}
      </Typography>
      <Chip
        size="small"
        color={checked === name ? "success" : "default"}
        label={number}
      />
    </Box>
  );
};
const buttonClick = () => {
  addNotification({
    title: "Yipeeee",
    subtitle: "New Data added",
    theme: "light",
    duration: 4000,
    vibrate: Number[10],
    native: true, // when using native, your OS will handle theming.
  });
};

const array = ["Accepted", "Rejected", "Pending"];

const typeA = ["Chemical", "Other", "Equipment"];

function createData(id, name, quantity, price) {
  return {
    id,
    name,
    quantity,
    type: typeA[Math.floor(Math.random() * typeA.length)],
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
    status: array[Math.floor(Math.random() * array.length)],
  };
}

const Tabs = ({ checked, setChecked, tabs }) => {
  let tabsList = Object.entries(tabs);
  return (
    <Box>
      <RadioGroup
        row
        value={checked}
        onChange={(event) => setChecked(event.target.value)}
      >
        {tabsList.map((tab, index) => (
          <FormControlLabel
            key={index}
            value={tab[0]}
            control={
              <Radio
                sx={{ visibility: "hidden", width: 0 }}
                // onClick={buttonClick}
              />
            }
            label={<TabLabel name={tab[0]} checked={checked} number={tab[1]} />}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

const Inventory = () => {
  const theme = useTheme();
  const [names, setNames] = useState([]);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState("All");
  const [rows, setRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tabs, setTabs] = useState({
    All: 0,
    Accepted: 0,
    Rejected: 0,
    Pending: 0,
  });
  useEffect(() => {
    if (rows) {
      let x = {
        All: 0,
        Accepted: 0,
        Rejected: 0,
        Pending: 0,
      };
      let array = [];
      rows.map((row) => {
        x[row.status]++;
        x["All"]++;
        array.push(row.name);
      });
      console.log(array);
      setNames(array);
      setTabs(x);
    }
  }, [rows]);

  useEffect(() => {
    let x = rows.filter((row) => {
      if (search === "") {
        return row;
      } else {
        return row.name.toLowerCase().includes(search.toLowerCase());
      }
    });
    setFilteredData(x);
  }, [search]);

  useEffect(() => {
    let array = [];
    let x = {
      All: 0,
      Accepted: 0,
      Rejected: 0,
      Pending: 0,
    };
    data.partners.forEach((item) => {
      let data = createData(item.age, item.name, item.gender, item.location, item.status);
      array.push(data);
      x[data.status]++;
      x["All"]++;
    });
    setTabs(x);
    setRows(array);
    setFilteredData(array);
  }, []);

  const { id } = useParams();
  console.log(id);
  return (
    <Box sx={{ display: "flex" }}>
      {/* <PersistentDrawerLeft /> */}
      <Box sx={{ padding: 2, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 0",
          }}
        >
          <Typography variant={theme.breakpoints.up("md") ? "h3" : "h5"}>
            My Connections
          </Typography>
          {names && (
            <Autocomplete
              inputValue={search}
              onInputChange={(event, newInputValue) => {
                setSearch(newInputValue);
              }}
              id="controllable-states-demo"
              options={names}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  color="success"
                  size={theme.breakpoints.up("md") ? "medium" : "small"}
                  {...params}
                  label="Search"
                />
              )}
            />
          )}
        </Box>
        {rows && (
          <div>
            <Tabs checked={checked} setChecked={setChecked} tabs={tabs} />
            {checked === "All" ? (
              <EnhancedTable
                type={id}
                checked={checked}
                rows={search ? filteredData : rows}
                setRows={setRows}
              />
            ) : (
              <TablePending
                type={id}
                checked={checked}
                rows={search ? filteredData : rows}
                setRows={setRows}
              />
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Inventory;

// style={{backgroundColor:"#233329"}}
