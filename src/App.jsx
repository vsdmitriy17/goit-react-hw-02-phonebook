import React, { Component } from 'react';
import styles from './App.module.css';
import SectionTitle from './components/sectionTitle/SectionTitle.jsx';
import Feedback from './components/feedback/Feedback.jsx';
import Statistics from './components/statistics/Statistics.jsx';
import Notification from './components/notification/Notification.jsx';

class App extends Component {
    state = {
        good: 0,
        neutral: 0,
        bad: 0
    }

    feedBackIncrement = (evt) => {
        const feedBack = evt.currentTarget.textContent.toLowerCase();
        this.setState((prevState) => {
            return {
                [feedBack]: prevState[feedBack] + 1,
            }
        });
    };

    countTotalFeedback = () => {
        return (this.state.good + this.state.neutral + this.state.bad);
    };

    countPositiveFeedbackPercentage = () => {
        return Math.round((this.state.good * 100 / (this.state.good + this.state.neutral + this.state.bad)));
    };
    
    render() {
        const stateKeys = Object.keys(this.state);
        const { good, neutral, bad } = this.state;
        return (
            <div className={styles.container}>
                <SectionTitle title="Please leave feedback">
                    <Feedback
                        options={stateKeys}
                        onLeaveFeedback={this.feedBackIncrement}
                    />
                </SectionTitle>
                <SectionTitle title="Statistics">
                    {(good || neutral || bad) ? (
                    <Statistics
                        pervState={this.state}
                        total={this.countTotalFeedback()}
                        positive={this.countPositiveFeedbackPercentage()}
                    />
                    ) : <Notification message="No feedback given"/>}
                </SectionTitle>
            </div>
        );
    };
};

export default App;
