interface Room {
    number: number;
  }

export default function Hola ( props : Room ) {

    console.log("Hola", props.number);

    return (
        <div>
            //useMemo
        </div>
    );
}