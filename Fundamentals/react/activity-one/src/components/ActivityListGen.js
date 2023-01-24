import React from 'react';
import ActivityCard from './ActivityCard';

export default function ActivityListGen(props) {
    return (
        <div className='mt-3'>
            {props.activities.map((act) => (
                <ActivityCard
                    key={act.id}
                    act={act}
                    deleteActivity={props.deleteActivity}
                    editActivity={props.editActivity}
                />
            ))}
        </div>
    );
}