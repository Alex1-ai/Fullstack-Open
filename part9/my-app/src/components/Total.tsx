
export interface Content {
    name: string;
    exerciseCount: number;
  }

const Total = ({ content }: { content: Content[]}): JSX.Element => {
    return (
      <h3>
        Number of exercises{" "}
        {content.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </h3>
    )
  }


export default Total