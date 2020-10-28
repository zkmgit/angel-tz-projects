import moment from 'moment';

export default function UTC(date,format = 'YYYY-MM-DD HH:mm:ss'){
	return moment(date).format(format);
}