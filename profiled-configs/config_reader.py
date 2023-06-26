import os
from configparser import DEFAULTSECT, ConfigParser
from typing import Dict, List, Union


class ConfigReader:
    def __init__(
        self,
        env_params: Union[str, List[str]] = None,
        env_profile: str = None,  # "DEFAULT" if None
        file_name: str = None,  # Expected if file_dir is specified
        file_dir: str = None,  # User directory if None
    ):

        self.__config = {}

        if file_dir is not None and file_name is None:
            raise Exception("Config file name not specified.")

        # Read config file
        if file_name is not None:
            profile = env_profile or DEFAULTSECT

            file_path = file_dir or os.path.expanduser("~")
            file_path = os.path.join(file_path, file_name)

            file_config = ConfigParser()
            file_config.read(file_path)

            if profile in file_config:
                section = dict(file_config[profile].items())
                self.__config.update(section)

        # Check env variables
        if env_params is not None:
            env_params = [env_params] if isinstance(env_params, str) else env_params

            for param in env_params:
                value = os.environ.get(param)
                if value is not None:
                    self.__config[param] = value

        if not self.__config:
            raise Exception("Empty config.")

    @property
    def config(self) -> Dict:
        return self.__config


if __name__ == "__main__":
    os.environ["name"] = "some_env_password"

    profiler = ConfigReader(
        env_params=["name", "password"],
        env_profile="profile_a",
        file_name=".example_profiles",
        file_dir=os.path.dirname(os.path.abspath(__file__)),
    )

    from pprint import pprint

    pprint(profiler.config)
