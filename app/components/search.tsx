import { SetStateAction, useState } from 'react';
import { TextField, Button, Grid,Autocomplete, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import TagSelecter from '@/components/TagSelecter';
import queryString from 'query-string';
import {useEffect} from 'react'



export default function SearchForm() {
  const today = dayjs().format('MM-DD-YYYY')
  const [keyword, setKeyword] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);
  const [minMaleCount, setMinMaleCount] = useState<string>('');
  const [maxMaleCount, setMaxMaleCount] = useState<string>('');
  const [minFemaleCount, setMinFemaleCount] = useState<string>('');
  const [maxFemaleCount, setMaxFemaleCount] = useState<string>('');
  const [minTotalCount, setMinTotalCount] = useState<string>('');
  const [maxTotalCount, setMaxTotalCount] = useState<string>('');
  const [minPlaytime, setMinPlaytime] = useState<number>(0);
  const [maxPlaytime, setMaxPlaytime] = useState<number>(4);
  const [sort_by, setSortIndex] = useState<number>(0); 
  const [sortDirection, setSortDirection] = useState<number>(0); //デフォルトは昇順
  const [tags,setSelectedTags] = useState<string[]>([]);

  const router = useRouter();

  const handleChildStateChange = (value: SetStateAction<string[]>) => {
    setSelectedTags(value);
  };

  useEffect(() => {
    handleSubmit()
  }, [sortDirection, sort_by]);

  const handleSubmit = () => {
   

    const pagequery = window.location.search;
    const queryParams = queryString.parse(pagequery);

    const page = 1;
    const per = 8;

    const searchParams: Record<string, string> = {
      keyword: keyword,
      minMaleCount: minMaleCount,
      maxMaleCount: maxMaleCount,
      minFemaleCount: minFemaleCount,
      maxFemaleCount: maxFemaleCount,
      minTotalCount: minTotalCount,
      maxTotalCount: maxTotalCount,
      minPlaytime: minPlaytime.toString(),
      maxPlaytime: maxPlaytime.toString(),
      sort_by: sort_by.toString(),
      sortDirection: sortDirection.toString(),
      tags: tags.join(','), // tagsをカンマ区切りの文字列に変換
      page: page.toString(),
      per: per.toString(),
    };
    
    const query = new URLSearchParams(searchParams).toString();
    router.push(`/?${query}`);
        
  };

  return (
    <>
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
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setKeyword(e.target.value)}
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

                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setMinMaleCount(e.target.value)}
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
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setMaxMaleCount(e.target.value)}
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

                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setMinFemaleCount(e.target.value)}
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
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setMaxFemaleCount(e.target.value)}
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

                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setMinTotalCount(e.target.value)}
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
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setMaxTotalCount(e.target.value)}
              />
        </Grid>
        <Grid item xs={12} sm={3}>
        <Typography variant="subtitle1">上演時間</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
      <TextField
        select
        value={minPlaytime}
        onChange={(e:any)  => setMinPlaytime(e.target.value)}
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
        onChange={(e:any)  => setMaxPlaytime(e.target.value)}
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
        <TagSelecter  onChildStateChange={handleChildStateChange} tags={undefined}/>
      </div>
    </Grid>
    <Grid item xs={12} style={{textAlign:"center"}}>
      <Button size="large"  color="primary" variant="contained" style={{width:"80%"}} onClick={handleSubmit}>検索</Button>
    </Grid>
    </Grid>
    <div className='sortContainer'>
    <TextField
        select
        value={sort_by}
        onChange={(e:any)  => setSortIndex(e.target.value)}
      >
        <MenuItem value={0}>お気に入り順</MenuItem>
        <MenuItem value={1}>人数順(男)</MenuItem>
        <MenuItem value={2}>人数順(女)</MenuItem>
        <MenuItem value={3}>総人数</MenuItem>
        <MenuItem value={4}>作成日</MenuItem>
      </TextField>
      <TextField
        select
        value={sortDirection}
        onChange={(e:any) => setSortDirection(e.target.value)}
      >
        <MenuItem value={0}>昇順</MenuItem>
        <MenuItem value={1}>降順</MenuItem>
      </TextField>
    </div>
    </>
  );
        }