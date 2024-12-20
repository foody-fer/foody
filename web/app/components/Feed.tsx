import Post from "./Post";

export default function Feed(){
    const list = [['Pero Peric', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', 121, 58],
        ['Vedran Oblakovic', 'https://images.pexels.com/photos/793785/pexels-photo-793785.jpeg?auto=compress&cs=tinysrgb&w=800', 1008, 236],
        ['Ivica Ivic', 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg?auto=compress&cs=tinysrgb&w=800', 22, 8],
        ['Vid Vidic', 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=800', 78, 25],
        ['Peeero Vidic', 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=800', 78, 25],
        ['Darko Vidic', 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=800', 78, 25],
        ['Ivan Vidic', 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=800', 78, 25],
    ];

    return (
        <div className="w-[36%] h-auto bg-navbarColor rounded-lg flex flex-col justify-center items-center pt-3">
            {list.map((item) => (
                <Post name={item[0]} pic={item[1]} like={item[2]} com={item[3]} key={item[0]} />
            ))}
        </div>
    );
}