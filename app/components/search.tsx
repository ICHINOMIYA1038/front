import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import dayjs from 'dayjs';

export default function SearchForm() {
    const today = dayjs().format('MM-DD-YYYY')
const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [minMaleCount, setMinMaleCount] = useState('');
  const [maxMaleCount, setMaxMaleCount] = useState('');
  const [minFemaleCount, setMinFemaleCount] = useState('');
  const [maxFemaleCount, setMaxFemaleCount] = useState('');
  const [minTotalCount, setMinTotalCount] = useState('');
  const [maxTotalCount, setMaxTotalCount] = useState('');
  const [minPlaytime, setMinPlaytime] = useState('');
  const [maxPlaytime, setMaxPlaytime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchParams = {
      keyword,
      startDate,
      endDate,
      minMaleCount,
      maxMaleCount,
      minFemaleCount,
      maxFemaleCount,
      minTotalCount,
      maxTotalCount,
      minPlaytime,
      maxPlaytime,
    };
  };

  
  console.log(today)

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Keyword"
            placeholder="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputProps={{
                inputProps: {
                  min: '0001-01-01',
                },
              }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Min Male Count"
            type="number"
            value={minMaleCount}
            onChange={(e) => setMinMaleCount(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Max Male Count"
            type="number"
            value={maxMaleCount}
            onChange={(e) => setMaxMaleCount(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Min Female Count"
            type="number"
            value={minFemaleCount}
            onChange={(e) => setMinFemaleCount(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Max Female Count"
            type="number"
            value={maxFemaleCount}
            onChange={(e) => setMaxFemaleCount(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Min Total Count"
            type="number"
            value={minTotalCount}
            onChange={(e) => setMinTotalCount(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Max Total Count"
            type="number"
            value={maxTotalCount}
            onChange={(e) => setMaxTotalCount(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Min Playtime"
            type="number"
            value={minPlaytime}
            onChange={(e) => setMinPlaytime(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Max Playtime"
            type="number"
            value={maxPlaytime}
            onChange={(e) => setMaxPlaytime(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
        }