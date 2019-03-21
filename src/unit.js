export const weapon = Object.freeze({
    sword: "0",
    lance: "1",
    axe: "2",
    fire: "3",
    lightning: "4",
    wind: "5",
    dagger: "6",
    bow: "7",
    staff: "8",
    dragon: "9",
    beast: "10",
})
    
export const color = Object.freeze({
    red: "11",
    blue: "12",
    green: "13",
})

export const movement = Object.freeze({
    infantry: "14",
    flier: "15",
    cavalry: "16",
    armored: "17",
})

export const Unit = () => ({
    name: 'Unit',
    ivs: [30, 30, 30, 30, 30],
    weapon: weapon.sword,
    color: color.red,
    movement: movement.infantry,
    skills: {
        a: '',
        b: '',
        c: '',
        seal: '',
    },
})
