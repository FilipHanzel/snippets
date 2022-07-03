import os

from slack_logger import SlackLogger

# Bot token is required and in this example expected in .token file
token_dir = os.path.dirname(os.path.relpath(__file__))
token_path = os.path.join(token_dir, ".token")

with open(token_path, "rt") as f:
    token = f.read().strip()

# To use all features, bot should be added to the channel
# and have chat:write and chat:write.customize permissions
slack_logger = SlackLogger(
    channel="slack-integration",
    token=token,
    username="some-logger-name",
)

# Log message to slack channel
slack_logger.log("Hello!")

# Log an exception to slack channel
result = 1 / 0
