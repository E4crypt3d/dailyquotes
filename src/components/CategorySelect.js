import React from 'react'

const CategorySelect = () => {
    let category = [
        'Age', 'Alone', 'Amazing', 'Anger', 'Architecture', 'Art',
        'Attitude',
        'Beauty',
        'Birthday',
        'Business',
        'Car',
        'Change',
        'Communications',
        'Computers',
        'Courage',
        'Education',
        'Equality',
        'Experience',
        'Failure',
        'Faith',
        'Family',
        'Famous',
        'Fear',
        'Fitness',
        'Food',
        'Forgiveness',
        'Freedom',
        'Friendship',
        'Funny',
        'Future',
        'Government',
        'Graduation',
        'Health',
        'History',
        'Home',
        'Inspirational',
        'Intelligence',
        'Jealousy',
        'Knowledge',
        'Leadership',
        'Love',
        'Life',
        'Marriage',
        'Men',
        'Mom',
        'Money',
        'Morning',
        'Movies',
        'Motivational',
        'Power',
        'Success',
        'Sports',
        'Religion',
        'Wisdom',
    ]
    return (
        <>
            <option value={''}>Choose a options</option>
            {category.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </>
    );
}

export default CategorySelect
