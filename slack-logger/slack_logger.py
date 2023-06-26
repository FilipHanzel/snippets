import json
import sys
import traceback
from types import TracebackType
from typing import Type

import requests


class SlackLogger:
    def __init__(self, channel: str, token: str, username: str = "slack-logger"):
        self.channel = channel
        self.username = username

        self._headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
        }

        self.attach()

    def attach(self):
        def _hook(
            type_: Type[BaseException],
            value: BaseException,
            tb: TracebackType,
        ):
            tb_string = "".join(traceback.format_tb(tb))
            self.log(f"Uncaught exception raised:\n```{tb_string}```")

        sys.excepthook = _hook

    def log(self, message: str, icon_emoji: str = ":information_source:"):
        payload = {
            "text": message,
            "channel": self.channel,
            "icon_emoji": icon_emoji,
            "username": self.username,
        }
        payload = json.dumps(payload)

        requests.post(
            url="https://slack.com/api/chat.postMessage",
            data=payload,
            headers=self._headers,
        )
