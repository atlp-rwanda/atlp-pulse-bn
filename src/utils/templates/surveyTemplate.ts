export default function Template(orgName: string, link: string) {
  return `
         <style>
        .container {
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            border-radius: 8px;
            max-width: 600px;
            margin: 0 auto;
            overflow: hidden;
            background-color: #ffff;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #E0E7FF; /* Blue background for the header */
            color: #5C31EF;
            padding: 12px;
            height: 60px; /* Fixed height for the header */
            font-size: 18px;
        }
        .header svg {
            width: 24px;
            height: 24px;
            margin-right: 8px; /* Adjust margin as needed */
        }
        .message-container {
            padding: 16px;
            font-size: 16px;
            font-family: 'Rubik', sans-serif;
            color: black;
            display: flex;
            flex-direction: column;
            align-items: center; /* Center content horizontally */
            text-align: center; /* Center text */
        }
        .button {
            font-size: 16px;
            background-color: #8667F2;
            font-family: 'Rubik', sans-serif;
            text-align: center;
            border: none;
            border-radius: 3px;
            padding: 10px 20px;
            cursor: pointer;
            color: #ffff;
            display: inline-block;
            margin-top: 16px;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
<svg width="161" height="139" viewBox="0 0 161 139" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M147.583 5.79162H100.625C96.7843 5.77804 93.0604 6.93089 90.1049 9.04845C87.1494 11.166 85.1505 14.1134 84.4579 17.375L78.2863 46.6229C77.8597 48.6606 77.9571 50.7544 78.5715 52.756C79.1859 54.7576 80.3023 56.6183 81.8417 58.2062C83.3896 59.7949 85.3194 61.0737 87.4973 61.9538C89.6751 62.834 92.0487 63.2943 94.4533 63.3029H114.042L112.365 67.1254C111.126 69.9597 110.696 73.0095 111.111 76.0175C111.525 79.0255 112.772 81.9032 114.745 84.4078C116.718 86.9124 119.361 88.9703 122.449 90.4077C125.538 91.8451 128.981 92.6199 132.49 92.6666C133.791 92.6755 135.068 92.3571 136.164 91.7504C137.26 91.1436 138.128 90.2747 138.661 89.2495L153.688 59.9437C154.03 59.3053 154.235 58.6184 154.292 57.9166V11.5833C154.292 10.0472 153.585 8.57411 152.327 7.48796C151.069 6.40181 149.363 5.79162 147.583 5.79162ZM140.875 56.3529L128.599 80.2724C127.401 79.7096 126.368 78.9171 125.58 77.9558C124.791 76.991 124.291 75.8718 124.127 74.699C123.963 73.5263 124.14 72.3367 124.641 71.2374L127.19 65.4458C127.861 63.9437 128.089 62.3214 127.855 60.7244C127.621 59.1273 126.931 57.6054 125.848 56.295C124.782 54.9895 123.363 53.9278 121.716 53.2013C120.068 52.4748 118.24 52.1054 116.39 52.125H94.3192C93.8735 52.126 93.4329 52.0438 93.0276 51.8838C92.6223 51.7238 92.2619 51.49 91.9713 51.1983C91.4505 50.5807 91.2335 49.8105 91.3675 49.0554L97.5392 20.097C97.5103 19.7381 97.5698 19.3779 97.7137 19.0403C97.8576 18.7026 98.0828 18.3951 98.3743 18.1379C98.6658 17.8808 99.0171 17.6798 99.405 17.5483C99.7929 17.4168 100.209 17.3577 100.625 17.375H140.875V56.3529ZM66.6808 75.5812H47.2938L48.9708 71.7587C50.1911 68.9079 50.5961 65.8448 50.1516 62.8299C49.7071 59.8149 48.4261 56.9372 46.4175 54.4412C44.4089 51.9452 41.7321 49.9047 38.6145 48.4932C35.4969 47.0816 32.0307 46.3406 28.5104 46.3333C27.2086 46.3244 25.9319 46.6428 24.8361 47.2495C23.7402 47.8563 22.8725 48.7252 22.3388 49.7504L7.31209 79.0562C6.92767 79.7841 6.7221 80.5729 6.70834 81.3729V127.706C6.70834 129.242 7.41511 130.715 8.67317 131.802C9.93122 132.888 11.6375 133.498 13.4167 133.498H60.375C64.2157 133.511 67.9396 132.359 70.8951 130.241C73.8506 128.123 75.8495 125.176 76.5421 121.915L82.7138 92.9562C83.1403 90.9185 83.0429 88.8247 82.4285 86.8231C81.8142 84.8214 80.6978 82.9608 79.1583 81.3729C77.7037 79.6712 75.8302 78.2692 73.6727 77.2677C71.5151 76.2663 69.1272 75.6903 66.6808 75.5812ZM63.4608 119.482C63.3457 120.106 62.9661 120.671 62.396 121.067C61.8258 121.463 61.1055 121.662 60.375 121.625H20.125V82.647L32.4013 58.7275C33.5994 59.2903 34.6321 60.0828 35.42 61.0441C36.2095 62.0089 36.7086 63.1281 36.8726 64.3009C37.0365 65.4736 36.8601 66.6632 36.3592 67.7625L33.81 73.5541C33.1394 75.0562 32.9109 76.6785 33.1451 78.2755C33.3792 79.8726 34.0687 81.3945 35.1517 82.7049C36.2032 84.0317 37.615 85.1161 39.2639 85.8632C40.9127 86.6102 42.7483 86.9974 44.6104 86.9908H66.6808C67.1265 86.9897 67.5671 87.072 67.9724 87.2319C68.3777 87.3919 68.7381 87.6258 69.0288 87.9174C69.5495 88.535 69.7665 89.3053 69.6325 90.0604L63.4608 119.482Z" fill="#8667F2"/>
</svg>

            <span>TTL performance</span>
        </div>
        <div class="message-container">
                <p>Hello Lievin,</p>
            <p>We hope you are doing well.
            Thank you for being with us that last four weeks.
            To help us improve, we’d like to ask you a few questions about your experience so far. It’ll take only 1-2 minutes, and you answers will help us to make this program even better for you and others.

Thanks,
DevPulse.</p>
            <a href="${link}" style="text-decoration: none; cursor: pointer">
                <button class="button">
                    Take Survey
                </button>
            </a>
        </div>
    </div>
    `
}
