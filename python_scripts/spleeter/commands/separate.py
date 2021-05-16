#!/usr/bin/env python
# coding: utf8

"""
    Entrypoint provider for performing source separation.

    USAGE: python -m spleeter separate \
        -p /path/to/params \
        -i inputfile1 inputfile2 ... inputfilen
        -o /path/to/output/dir \
        -i /path/to/audio1.wav /path/to/audio2.mp3
"""

from audio.adapter import get_audio_adapter
from separator import Separator

__email__ = 'research@deezer.com'
__author__ = 'Deezer Research'
__license__ = 'MIT License'



def entrypoint(arguments, params):
    """ Command entrypoint.

    :param arguments: Command line parsed argument as argparse.Namespace.
    :param params: Deserialized JSON configuration file provided in CLI args.
    """
    # TODO: check with output naming.

    print ('entrypoint')
    print ('inputs args:')
    print (arguments.inputs)
    print ('audio adapter arguments:')
    print(arguments.audio_adapter)
    print('arguments config:')
    print(arguments.configuration)
    print('MWF arguments')
    print(arguments.MWF)
    print('stft backend arguments')
    print(arguments.stft_backend)
    audio_adapter = get_audio_adapter(arguments.audio_adapter)
    print (audio_adapter)
    print(audio_adapter.__dict__)
    separator = Separator(
        arguments.configuration,
        MWF=arguments.MWF,
        stft_backend=arguments.stft_backend)
    
    print (separator.__dict__)
    for filename in arguments.inputs:
        print ('Todos los argumentos de separate_to_file:')
        print(filename)
        print(arguments.output_path)
        print(audio_adapter)
        print(arguments.offset)
        print(arguments.duration)
        print(arguments.codec)
        print(arguments.bitrate)
        print(arguments.filename_format)
        separator.separate_to_file(
            filename,
            arguments.output_path,
            audio_adapter=audio_adapter,
            offset=arguments.offset,
            duration=arguments.duration,
            codec=arguments.codec,
            bitrate=arguments.bitrate,
            filename_format=arguments.filename_format,
            synchronous=False
        )
    separator.join()
