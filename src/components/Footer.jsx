import { FaGithub } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="footer-wrapper">
      <p>Drag and drop to reorder list</p>
      <div class="attribution">
        Challenge by
        <a
          href="https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by
        <a
          href="https://github.com/mattdavis06/Frontend-Mentor-Projects/tree/main/15.%20todo-app"
          target="_blank"
          rel="noreferrer"
        >
          Matt Davis
        </a>
        .
        <div class="icon">
          <a
            href="https://github.com/mattdavis06"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
