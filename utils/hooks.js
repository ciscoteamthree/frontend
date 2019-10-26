import moment from 'moment';
import { DATE_FORMAT } from '../config';

export const timeLeftSlice = (meeting, sliceId) => {
  const totalTime = meeting.agenda
    .slice(
      0,
      meeting.agenda.indexOf(meeting.agenda.find(a => a.id == sliceId)) + 1
    )
    .reduce((a, b) => a + b.duration * 60, 0);
  const elapsed = moment().diff(moment(meeting.startTime, DATE_FORMAT)) / 1000;
  console.log(totalTime);
  console.log(elapsed);
  return totalTime - elapsed;
};
