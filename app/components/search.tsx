import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';


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

  const [isOpen, setIsOpen] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false
  });

  const handleToggle = (item) => {
    setIsOpen((prevOpen) => ({
      ...prevOpen,
      [item]: !prevOpen[item]
    }));
  };


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
    <Grid container alignItems="center">
    <Grid item xs={12}>
      <div className="keywordContainer">
      <Grid container spacing={1} alignItems="center">
      <Grid item xs={12} sm={12} md={2}>
          <Typography variant="subtitle1" >キーワード</Typography>
        </Grid >
        <Grid item xs={12} sm={12} md={10}>
        <div className="keyword-field-radius">
        <TextField
          className="keywordInput"
          label="Rounded Text Field"
          variant="outlined"
        />
        </div>
        </Grid>
        </Grid>
      </div>
      
    </Grid>
    <Grid item xs={12} md={6}>
      <div className="queryContainer">
        <Grid container spacing={1} alignItems="center" >
        
        <Grid item xs={3}>
          <Typography variant="subtitle1">男性人数</Typography>
        </Grid >
        <Grid item xs={9}>
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


        <Grid item xs={3}>
          <Typography variant="subtitle1">女性人数</Typography>
        </Grid>
        <Grid item xs={9}>
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
        <Grid item xs={3}>
        <Typography variant="subtitle1">総人数</Typography>
        </Grid>
        <Grid item xs={9}>
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
        <Grid item xs={3}>
        <Typography variant="subtitle1">上演時間</Typography>
        </Grid>
        <Grid item xs={9}>
        <TextField
        sx={{
          width: "45%"
      }}
                label="上演時間(最短)"
                type="number"
                size="small"
                value={minPlaytime}

                onChange={(e) => setMinPlaytime(e.target.value)}
              />
        <span>〜</span>
        <TextField
        sx={{
          width: "45%"
      }}
                label="上演時間(最長)"
                type="number"
                value={maxPlaytime}
                size="small"
                onChange={(e) => setMaxPlaytime(e.target.value)}
              />
              </Grid>
        </Grid> 
      </div>
    </Grid>
    <Grid item xs={12} md={6}>
      <div className="genreContainer">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={isOpen.item1 ? <CloseIcon /> : <ExpandMoreIcon />}
          onClick={() => handleToggle('item1')}
        >
          {isOpen.item1 ? '閉じる' : '開く'}
        </Button>
        {isOpen.item1 && (
          <>
            <Typography variant="body1">コンテンツ1</Typography>
          </>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={isOpen.item2 ? <CloseIcon /> : <ExpandMoreIcon />}
          onClick={() => handleToggle('item2')}
        >
          {isOpen.item2 ? '閉じる' : 'ホラー'}
        </Button>
        {isOpen.item2 && (
          <>
            <Typography variant="body1">コンテンツ2</Typography>
          </>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={isOpen.item3 ? <CloseIcon /> : <ExpandMoreIcon />}
          onClick={() => handleToggle('item3')}
        >
          {isOpen.item3 ? '閉じる' : '開く'}
        </Button>
        {isOpen.item3 && (
          <>
            <Typography variant="body1">コンテンツ3</Typography>
          </>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={isOpen.item4 ? <CloseIcon /> : <ExpandMoreIcon />}
          onClick={() => handleToggle('item4')}
        >
          {isOpen.item4 ? '閉じる' : '開く'}
        </Button>
        {isOpen.item4 && (
          <>
            <Typography variant="body1">コンテンツ4</Typography>
          </>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={isOpen.item5 ? <CloseIcon /> : <ExpandMoreIcon />}
          onClick={() => handleToggle('item5')}
        >
          {isOpen.item5 ? '閉じる' : '開く'}
        </Button>
        {isOpen.item5 && (
          <>
            <Typography variant="body1">コンテンツ5</Typography>
          </>
        )}
      </div>
    </Grid>
    <Grid item xs={12} md={6}>
      <div className="categoryContainer"></div>
    </Grid>
    <Grid item xs={12} md={6}>
      <div className='tagContainer'></div>
    </Grid>
    </Grid>
  );
        }