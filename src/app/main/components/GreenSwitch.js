import { withStyles, Switch } from '@material-ui/core';
import { grey, green } from '@material-ui/core/colors';

const GreenSwitch = withStyles({
	switchBase: {
		color: grey[300],
		'&$checked': {
			color: green[500]
		},
		'&$checked + $track': {
			backgroundColor: green[500]
		}
	},
	checked: {},
	track: {}
})(Switch);

export default GreenSwitch;
