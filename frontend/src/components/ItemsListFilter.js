import React, { useCallback, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import WindowSharpIcon from '@mui/icons-material/WindowSharp'
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp'

const ItemsListFilter = ({ items, sortByItems }) => {
  const [sort, setSort] = useState('Recently')

  const handleSort = (event) => {
    const sortBy = event.target.value

    let sortItem = items
    switch (sortBy) {
      case 'Recently':
        // 발행 최신순 : date
        sortItem = items.sort((a, b) => {
          return b.date.replace(/[^0-9]/g, '') - a.date.replace(/[^0-9]/g, '')
        })
        break
      case 'Oldest':
        // 발행 오래된순 : date
        sortItem = items.sort((a, b) => {
          return a.date.replace(/[^0-9]/g, '') - b.date.replace(/[^0-9]/g, '')
        })
        break
      case 'Price: Low to High':
        // 가격 낮은순 : price
        sortItem = items.sort((a, b) => {
          return +a.price - +b.price
        })
        break
      case 'Price: Hight to Low':
        // 가격 높은순 : price
        sortItem = items.sort((a, b) => {
          return +b.price - +a.price
        })
        break
      case 'Most Favorited':
        // 좋아요 많은순 : likeCnt
        sortItem = items.sort((a, b) => {
          return b.likeCnt - a.likeCnt
        })
        break
    }

    sortByItems(sortItem) // 부모에게 전달

    setSort(sortBy)
  }

  const [grid, setGrid] = React.useState('large')

  const handleGrid = (event, newGrid) => {
    alert(newGrid)
    setGrid(newGrid)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 'auto',
        margin: '16px 0px 10px',
        '@media(max-width: 480px)': {
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        },
      }}
    >
      <Box
        mr="16px"
        sx={{
          width: 'inherit',
          '@media(max-width: 480px)': {
            margin: '0 auto',
          },
        }}
      >
        <Autocomplete
          sx={{ width: 'auto' }}
          size="small"
          freeSolo
          options={searchArray}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
      </Box>

      <Box
        sx={{
          '@media(max-width: 480px)': {
            marginTop: '10px',
          },
        }}
      >
        <FormControl sx={{ minWidth: '200px' }} size="small">
          <InputLabel>Sort by</InputLabel>
          <Select value={sort} onChange={handleSort} label="Sort by">
            {sortArray.map((value, index) => (
              <MenuItem value={value} key={index}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

const searchArray = ['몰루']
const sortArray = [
  // 'Recently Created',
  // 'Recently Sold',
  'Recently',
  'Oldest',
  'Price: Low to High',
  'Price: Hight to Low',
  'Most Favorited',
]

export default ItemsListFilter
