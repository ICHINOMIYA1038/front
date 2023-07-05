import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';


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
  const router = useRouter();


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
    const query = new URLSearchParams(searchParams).toString();
    router.push(`/?${query}`);
    
  };

  return (
   <div className="searchFormContainer">
    <Grid container>
    <Grid item>
      <div className="keywordContainer">
        <p>キーワード</p>
        <div className="keyword-field-radius">
        <TextField
          className="keywordInput"
          label="Rounded Text Field"
          variant="outlined"
          borderRadius="20px"
        />
        </div>
      </div>
    </Grid>
    <Grid item>
      <div className="queryContainer">
        <div className="manField">
        <Typography variant="subtitle1">男性人数</Typography>
        <TextField
                sx={{
                  width: 80
              }}
                label="男(最小)"
                type="number"
                size="small"
                value={minMaleCount}

                onChange={(e) => setMinMaleCount(e.target.value)}
              />
        <span>〜</span>
        <TextField
                label="男(最大)"
                type="number"
                value={maxMaleCount}
                size="small"
                onChange={(e) => setMaxMaleCount(e.target.value)}
              />
        </div>
        <div className="womanField">
        <Typography variant="subtitle1">女性人数</Typography>
        <TextField
                label="女(最小)"
                type="number"
                size="small"
                value={minMaleCount}

                onChange={(e) => setMinMaleCount(e.target.value)}
              />
        <span>〜</span>
        <TextField
                label="女(最大)"
                type="number"
                value={maxMaleCount}
                size="small"
                onChange={(e) => setMaxMaleCount(e.target.value)}
              />
        </div>

        <div className="grossPeopleField">
        <Typography variant="subtitle1">総人数</Typography>
        <TextField
                label="総人数(最小)"
                type="number"
                size="small"
                value={minMaleCount}

                onChange={(e) => setMinMaleCount(e.target.value)}
              />
        <span>〜</span>
        <TextField
                label="総人数(最大)"
                type="number"
                value={maxMaleCount}
                size="small"
                onChange={(e) => setMaxMaleCount(e.target.value)}
              />
        </div>

        <div className="playTimeField">
        <Typography variant="subtitle1">上演時間</Typography>
        <TextField
                label="上演時間(最短)"
                type="number"
                size="small"
                value={minMaleCount}

                onChange={(e) => setMinMaleCount(e.target.value)}
              />
        <span>〜</span>
        <TextField
                label="上演時間(最長)"
                type="number"
                value={maxMaleCount}
                size="small"
                onChange={(e) => setMaxMaleCount(e.target.value)}
              />
        </div>

      </div>
    </Grid>
    <Grid item>
      <div className="genreContainer"></div>
    </Grid>
    <Grid item>
      <div className="categoryContainer"></div>
    </Grid>
    <Grid item>
      <div className='tagContainer'></div>
    </Grid>
    </Grid>
   </div>
  );
        }