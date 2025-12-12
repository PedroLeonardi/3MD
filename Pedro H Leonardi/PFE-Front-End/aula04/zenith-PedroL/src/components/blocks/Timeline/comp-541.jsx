import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

const items = [
  {
    id: 1,
    date: "15 Mar , 2024",
    title: "Fundação",
    description: "Fundada por um grupo de estudantes.",
  },
  {
    id: 2,
    date: "20 Mar, 2025",
    title: "Primeiro Software",
    description: "Lancamento do primeiro softawere.",
  },
  {
    id: 3,
    date: "5 Apr, 2025",
    title: "Expansão do Ramo",
    description: "Crescimento para o ramo empresarial.",
  },
  {
    id: 4,
    date: "19 Apr, 2025",
    title: "Reconhecimento Internacional",
    description: "Reconhecimento em diversos premios internacionais.",
  },
]

export default function Component() {
  return (
    <Timeline defaultValue={3} orientation="horizontal">
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          step={item.id}
          className="group-data-[orientation=horizontal]/timeline:mt-0">
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=horizontal]/timeline:top-8" />
            <TimelineDate className="mb-10">{item.date}</TimelineDate>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineIndicator className="group-data-[orientation=horizontal]/timeline:top-8" />
          </TimelineHeader>
          <TimelineContent>{item.description}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
