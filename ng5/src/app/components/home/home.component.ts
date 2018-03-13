import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page: Object

  constructor() {}

  ngOnInit() {
    this.page = {
      company: {
        name: "Kinderdagverblijf Ollie & Co",
        address: "Oude Oostrumseweg 26",
        postal: "5802CC Venray",
        phone: "0478-579475",
        email: "kdvollie@gmail.com"
      },
      banners: [
        {
          image: "building.jpg",
          alt: "Ons pand"
        },
        {
          image: "ander.jpg",
          alt: "Andere afbeelding"
        },
        {
          image: "nogeen.jpg",
          alt: "nog een afbeelding"
        }
      ],
      quote: "Ondanks dat wij bij Ollie & Co nederlands spreken, vindt onze naam zijn oorsprong in het Venrayse dialect. “wej brenge um bej ollie”",
      card1: {
        title: "Kaart 1",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.",
        action: "#",
        actionText: "Meer informatie"
      },
      card2: {
        title: "Kaart 2",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.",
        action: "#",
        actionText: "Meer informatie"
      },
      card3: {
        title: "Kaart 3",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.",
        action: "#",
        actionText: "Meer informatie"
      }
    }
  }
}
