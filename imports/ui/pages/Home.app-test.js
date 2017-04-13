import { beforeEach, describe, it } from 'mocha';
import { DDP } from 'meteor/ddp-client';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';
import chai from 'chai';

const expect = chai.expect;

const waitForSubscriptions = () => new Promise(resolve => {
    const poll = Meteor.setInterval(() => {
        if (DDP._allSubscriptionsReady()) {
            Meteor.clearInterval(poll);
            resolve();
        }
    }, 200);
});

//const afterFlushPromise = new Promise((resolve, reject) => {
//    Tracker.afterFlush((err, val) => {
//        if (err) {
//            reject(err);
//        } else {
//            resolve(val);
//        }
//    });
//});

const generateData = () => {
    return new Promise(resolve => resolve());
};

const id = (id) => document.getElementById(id);

if (Meteor.isClient) {
    describe('homepage loads correctly', () => {
        beforeEach(() =>
            generateData()
            .then(() => FlowRouter.go('/'))
            .then(waitForSubscriptions)
        );
        describe('while not logged in', () => {
            it('runs???', () => {
                expect(3).to.equal(3);
                expect(id('sidebar').style.width).to.equal(100);
            });
        });
    });
}
