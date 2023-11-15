import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'

export default function CustomizedLoadingButton({ loading }) {
  return (
    <LoadingButton
      endIcon={<SendIcon />}
      loadingPosition='end'
      variant='outlined'
      loading={loading}
      sx={{ width: 100, marginBottom: 10 }}
      type='submit'
    >
      <span>送信</span>
    </LoadingButton>
  )
}
