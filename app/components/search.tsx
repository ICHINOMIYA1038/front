import { useState } from 'react';
import { TextField, Button, Grid,Autocomplete, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import TagSelecter from '@/components/TagSelecter';


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
  const [minPlaytime, setMinPlaytime] = useState(0);
  const [maxPlaytime, setMaxPlaytime] = useState(4);
  const [sort_by, setSortIndex] = useState(0);
  const [tags,setSelectedTags] = useState([]);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false
  });


  const handleChildStateChange = (value) => {

    setSelectedTags(value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const searchParams = {
      keyword,
      minMaleCount,
      maxMaleCount,
      minFemaleCount,
      maxFemaleCount,
      minTotalCount,
      maxTotalCount,
      minPlaytime,
      maxPlaytime,
      sort_by,
      tags,
    };
    const query = new URLSearchParams(searchParams).toString();
    router.push(`/?${query}`);
    
  };

  return (
    <Grid container alignItems="center">
    <Grid item xs={12} className="griditem-border">
      <div className="keywordContainer">
      <Grid container spacing={1} alignItems="center">
      <Grid item xs={12} sm={12} md={2} >
          <Typography variant="subtitle1" >キーワード</Typography>
        </Grid >
        <Grid item xs={12} sm={12} md={10}>
        <div className="keyword-field-radius">
        <TextField
          className="keywordInput"
          label="キーワード"
          variant="outlined"
          onChange={(e) => setKeyword(e.target.value)}
        />
        </div>
        </Grid>
        </Grid>
      </div>
      
    </Grid>
    <Grid item xs={12} md={6} className="griditem-border">
      <div className="queryContainer">
        <Grid container spacing={1} alignItems="center" >
        
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">男性人数</Typography>
        </Grid >
        <Grid item xs={12} sm={9}>
        <TextField
                sx={{
                  width: "45%"
              }}
                label="男(最小)"
                type="number"
                size="small"
                value={minMaleCount}

                onChange={(e) => setMinMaleCount(e.target.value)}
              />
        <span>〜</span>
        <TextField
        sx={{
          width: "45%"
      }}
                label="男(最大)"
                type="number"
                value={maxMaleCount}
                size="small"
                onChange={(e) => setMaxMaleCount(e.target.value)}
              />
        

        </Grid>


        <Grid item  xs={12} sm={3}>
          <Typography variant="subtitle1">女性人数</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
        <TextField
        sx={{
          width: "45%"
      }}
                label="女(最小)"
                type="number"
                size="small"
                value={minFemaleCount}

                onChange={(e) => setMinFemaleCount(e.target.value)}
              />
        <span>〜</span>
        <TextField
        sx={{
          width: "45%"
      }}
                label="女(最大)"
                type="number"
                value={maxFemaleCount}
                size="small"
                onChange={(e) => setMaxFemaleCount(e.target.value)}
              />
        </Grid>
        <Grid item xs={12} sm={3}>
        <Typography variant="subtitle1">総人数</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
        <TextField
        sx={{
          width: "45%"
      }}
                label="総人数(最小)"
                type="number"
                size="small"
                value={minTotalCount}

                onChange={(e) => setMinTotalCount(e.target.value)}
              />
        <span>〜</span>
        <TextField
        sx={{
          width: "45%"
      }}
                label="総人数(最大)"
                type="number"
                value={maxTotalCount}
                size="small"
                onChange={(e) => setMaxTotalCount(e.target.value)}
              />
        </Grid>
        <Grid item xs={12} sm={3}>
        <Typography variant="subtitle1">上演時間</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
      <TextField
        select
        value={minPlaytime}
        onChange={(e) => setMinPlaytime(e.target.value)}
        sx={{ width: '45%' }}
      >
        <MenuItem value={0}>30分未満</MenuItem>
        <MenuItem value={1}>30分以上〜60分未満</MenuItem>
        <MenuItem value={2}>60分以上〜90分未満</MenuItem>
        <MenuItem value={3}>90分以上〜120分未満</MenuItem>
        <MenuItem value={4}>120分以上</MenuItem>
      </TextField>
      <span>〜</span>
      <TextField
        select
        value={maxPlaytime}
        onChange={(e) => setMaxPlaytime(e.target.value)}
        sx={{ width: '45%' }}
      >
        <MenuItem value={0}>30分未満</MenuItem>
        <MenuItem value={1}>30分以上〜60分未満</MenuItem>
        <MenuItem value={2}>60分以上〜90分未満</MenuItem>
        <MenuItem value={3}>90分以上〜120分未満</MenuItem>
        <MenuItem value={4}>120分以上</MenuItem>
      </TextField>
    </Grid>
        </Grid> 
      </div>
    </Grid>
    <Grid item xs={12} md={6} className="griditem-border">
      <div className='tagContainer'>
        <TagSelecter  onChildStateChange={handleChildStateChange}/>
      </div>
    </Grid>
    <button className="post-form-submit-button" type="submit" onClick={handleSubmit}>Register</button>
    <TextField
        select
        value={sort_by}
        onChange={(e) => setSortIndex(e.target.value)}
        sx={{ width: '45%' }}
      >
        <MenuItem value={0}>お気に入り順</MenuItem>
        <MenuItem value={1}>人数順(男)</MenuItem>
        <MenuItem value={2}>人数順(女)</MenuItem>
        <MenuItem value={3}>上演時間</MenuItem>
        <MenuItem value={4}>作成日</MenuItem>
        <MenuItem value={5}>更新日</MenuItem>
      </TextField>
    </Grid>

  );
        }