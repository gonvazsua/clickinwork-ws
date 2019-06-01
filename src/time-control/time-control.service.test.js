const timeControlService = require('./time-control.service');
const eventType = require('./event-type.enum');
const status = require('./time-control-status.enum');
const user = {"email":"test@test.com", "user_id": 1};

test('Get empty time control', () => {
    timeControlService.emptyTimeControl(user)
        .then(tc => {
            expect(tc.user_id).toBe(1);
            expect(tc.time_events.length).toBe(0);
        })
});

test('Add START event', () => {
    timeControlService
        .emptyTimeControl(user)
        .then(timeControlService.addStartEvent)
        .then(tc => {
            expect(tc.time_events.length).toBe(1);
            expect(tc.time_events[0].type).toBe(1);
            expect(tc.time_events[0].time).not.toBe(null);
        });
});



test('Add PAUSE event', () => {
    timeControlService
        .emptyTimeControl(user)
        .then(timeControlService.addPauseEvent)
        .then(tc => {
            expect(tc.time_events.length).toBe(1);
            expect(tc.time_events[0].type).toBe(eventType.PAUSE);
        })
        .catch(err => expect(err).toBe(null));
});

test('Add CONTINUE event', () => {
    timeControlService
        .emptyTimeControl(user)
        .then(timeControlService.addContinueEvent)
        .then(tc => {
            expect(tc.time_events.length).toBe(1);
            expect(tc.time_events[0].type).toBe(eventType.CONTINUE);
        })
        .catch(err => expect(err).toBe(null));
});

test('Stop time control', () => {
    timeControlService.
        emptyTimeControl(user)
        .then(timeControlService.setClosedStatus)
        .then(tc => {
            expect(tc.status).toBe(status.CLOSE);
        })
});