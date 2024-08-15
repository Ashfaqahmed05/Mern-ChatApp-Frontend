import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api';
import { useError } from '../../Hooks/Hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNotification } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';

const Notification = () => {
  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [ acceptRequest ] = useAcceptFriendRequestMutation();
  const { isNotification } = useSelector((state) => state.misc)
  const dispatch = useDispatch()

  const friendRequestHandler = async ({ _id, accept }) => {
      dispatch(setIsNotification(false))

    try {
      const res = await acceptRequest({requestId: _id, accept})
      if (res.data?.success) {
        console.log("socket use");
        toast.success(res.data.message)
      } else toast.error(res.data?.error || "Something went wrong")
    } catch (e) {
      toast.error(e.message || "Something went wrong")
      console.log(e || "Something went wrong")

    }

  };

  useError([{ error, isError }]);

  const handleNotificationDailog = () => {
    dispatch(setIsNotification(false))
  }


  return (
    <Dialog open={isNotification} onClose={handleNotificationDailog}>
      <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth={'25rem'}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.requests?.length > 0 ? (
              data.requests.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography>No notifications yet.</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        <Avatar src={avatar} alt={name} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {name}
        </Typography>

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notification;
