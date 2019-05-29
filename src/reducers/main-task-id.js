export const MAIN_TASK_ID_CHANGE = 'main-task-id/MAIN_TASK_ID_CHANGE'

export default (state = null, action) => {
	switch (action.type) {
		case MAIN_TASK_ID_CHANGE:
			return action.data
		default:
			return state
	}
}

export const setMainTaskId = (data) => {
	return {
		type: MAIN_TASK_ID_CHANGE,
		data,
	}
}
